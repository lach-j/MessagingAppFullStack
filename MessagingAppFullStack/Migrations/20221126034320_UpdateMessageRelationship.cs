using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessagingAppFullStack.Migrations
{
    public partial class UpdateMessageRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_MessageGroups_MessageGroupId",
                table: "Messages");

            migrationBuilder.AlterColumn<long>(
                name: "MessageGroupId",
                table: "Messages",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_MessageGroups_MessageGroupId",
                table: "Messages",
                column: "MessageGroupId",
                principalTable: "MessageGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_MessageGroups_MessageGroupId",
                table: "Messages");

            migrationBuilder.AlterColumn<long>(
                name: "MessageGroupId",
                table: "Messages",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_MessageGroups_MessageGroupId",
                table: "Messages",
                column: "MessageGroupId",
                principalTable: "MessageGroups",
                principalColumn: "Id");
        }
    }
}
