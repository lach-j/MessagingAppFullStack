﻿using System.Text.Json;
using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Exceptions;
using MessagingAppFullStack.Security;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Services;

public class PermissionService : IPermissionService
{
    private readonly IDictionary<long, IDictionary<PermissionType, PermissionCacheState>> _permissionCache =
        new Dictionary<long, IDictionary<PermissionType, PermissionCacheState>>();

    private readonly TimeSpan _cacheExpiration = new(0, 0, 30);

    private readonly ILogger<PermissionService> _logger;
    private readonly EfCoreContext _db;

    public PermissionService(ILogger<PermissionService> logger, EfCoreContext db)
    {
        _logger = logger;
        _db = db;
    }

    public async Task<bool> UserHasPermissionAsync(long userId, PermissionType permission)
    {
        if (!_permissionCache.ContainsKey(userId))
            _permissionCache[userId] = new Dictionary<PermissionType, PermissionCacheState>();

        if (_permissionCache[userId].TryGetValue(permission, out var cacheState))
        {
            if (cacheState.Expires <= DateTime.UtcNow)
                _permissionCache[userId].Remove(permission);
            else
                return cacheState.HasPermission;
        }
        
        var permissions = await
            _db.Permissions.Include(p => p.Roles)
                .ThenInclude(r => r.Users)
                .Where(p => p.Roles.Any(r => r.Users.Any(u => u.Id == userId)))
                .Distinct()
                .ToListAsync();

        foreach (var userPermission in permissions)
        {
            _permissionCache[userId][userPermission.Name] =  new PermissionCacheState() {Expires = DateTime.UtcNow.Add(_cacheExpiration), HasPermission = true};
        }
        
        if (permissions.All(p => p.Name != permission))
            _permissionCache[userId][permission] =
                new PermissionCacheState() {Expires = DateTime.UtcNow.Add(_cacheExpiration), HasPermission = false};

        return _permissionCache[userId][permission].HasPermission;
    }

    public async Task<bool> UserHasPermissionAsync(User user, PermissionType permission)
    {
        return await UserHasPermissionAsync(user.Id, permission);
    }

    public async Task<ICollection<Permission>> GetAllUserPermissionsAsync(User user)
    {
        return await GetAllUserPermissionsAsync(user.Id);
    }

    public async Task<ICollection<Permission>> GetAllUserPermissionsAsync(long userId)
    {
        var permissions = await
            _db.Permissions.Include(p => p.Roles)
                .ThenInclude(r => r.Users)
                .Where(p => p.Roles.Any(r => r.Users.Any(u => u.Id == userId)))
                .Distinct()
                .ToListAsync();

        return permissions;
    }

    public async Task<Role?> AssignPermissionToRoleAsync(long permissionId, long roleId)
    {

        var permission = await _db.Permissions.FirstOrDefaultAsync(p => p.Id == permissionId);
        var role = await _db.Role.FirstOrDefaultAsync(r => r.Id == roleId);

        if (permission == null)
            throw new EntityNotFoundException<Permission>(permissionId);
        if (role == null)
            throw new EntityNotFoundException<Role>(roleId);

        if (role.Permissions.Contains(permission))
            return role;
        
        role.Permissions.Add(permission);
        await _db.SaveChangesAsync();
        return role;
    }

    public async Task<ICollection<Permission>> GetAllPermissionsAsync()
    {
        return await _db.Permissions.ToListAsync();
    }

    public async Task<Permission> CreatePermissionAsync(Permission permission)
    {
        var existingPerm = await _db.Permissions.FirstOrDefaultAsync(p => p.Name == permission.Name);
        if (existingPerm is not null)
            return existingPerm;
            

        var perm = await _db.Permissions.AddAsync(permission);
        await _db.SaveChangesAsync();


        return perm.Entity;
    }

    private class PermissionCacheState
    {
        public bool HasPermission { get; set; }
        public DateTime Expires { get; set; }
    }
}