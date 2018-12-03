using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ReactCore.Migrations
{
    public partial class changedtestIDtoid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Tests2",
                table: "Tests2");

            migrationBuilder.RenameTable(
                name: "Tests2",
                newName: "Test2s");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Tests",
                newName: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Test2s",
                table: "Test2s",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Test2s",
                table: "Test2s");

            migrationBuilder.RenameTable(
                name: "Test2s",
                newName: "Tests2");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Tests",
                newName: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tests2",
                table: "Tests2",
                column: "ID");
        }
    }
}
