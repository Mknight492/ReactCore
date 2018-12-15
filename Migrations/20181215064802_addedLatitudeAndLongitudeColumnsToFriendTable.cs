﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCore.Migrations
{
    public partial class addedLatitudeAndLongitudeColumnsToFriendTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Friends",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longitude",
                table: "Friends",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "Friends");
        }
    }
}
