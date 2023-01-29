using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessagingAppFullStack.Migrations
{
    public partial class ManyToManyUserMessageGroupRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_MessageGroups_MessageGroupId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_MessageGroupId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MessageGroupId",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "MessageGroupUser",
                columns: table => new
                {
                    ActiveUsersId = table.Column<long>(type: "bigint", nullable: false),
                    MessageGroupsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageGroupUser", x => new { x.ActiveUsersId, x.MessageGroupsId });
                    table.ForeignKey(
                        name: "FK_MessageGroupUser_MessageGroups_MessageGroupsId",
                        column: x => x.MessageGroupsId,
                        principalTable: "MessageGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessageGroupUser_Users_ActiveUsersId",
                        column: x => x.ActiveUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MessageGroupUser_MessageGroupsId",
                table: "MessageGroupUser",
                column: "MessageGroupsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MessageGroupUser");

            migrationBuilder.AddColumn<long>(
                name: "MessageGroupId",
                table: "Users",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_MessageGroupId",
                table: "Users",
                column: "MessageGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_MessageGroups_MessageGroupId",
                table: "Users",
                column: "MessageGroupId",
                principalTable: "MessageGroups",
                principalColumn: "Id");
        }
    }
}
