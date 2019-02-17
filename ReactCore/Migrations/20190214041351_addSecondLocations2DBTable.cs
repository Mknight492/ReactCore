using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactCore.Migrations
{
    public partial class addSecondLocations2DBTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations2",
                columns: table => new
                {
                    Geonameid = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Asciiname = table.Column<string>(nullable: true),
                    Alternatenames = table.Column<string>(nullable: true),
                    Latitude = table.Column<double>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    FeatureClass = table.Column<string>(nullable: true),
                    FeatureCode = table.Column<string>(nullable: true),
                    CountryCode = table.Column<string>(nullable: true),
                    Cc2 = table.Column<string>(nullable: true),
                    Admin1Code = table.Column<string>(nullable: true),
                    Admin2Code = table.Column<string>(nullable: true),
                    Admin3Code = table.Column<string>(nullable: true),
                    Admin4Code = table.Column<string>(nullable: true),
                    Population = table.Column<int>(nullable: true),
                    Elevation = table.Column<int>(nullable: true),
                    Dem = table.Column<int>(nullable: true),
                    Timezone = table.Column<string>(nullable: true),
                    ModificationDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations2", x => x.Geonameid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations2");
        }
    }
}
