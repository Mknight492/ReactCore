﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Entities;

namespace ReactCore.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20181212214813_removeTestTablesAddedFrendTable")]
    partial class removeTestTablesAddedFrendTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Entities.Models.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LocationId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("UserId");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("Entities.Models.Locations", b =>
                {
                    b.Property<int>("Geonameid")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Admin1Code");

                    b.Property<string>("Admin2Code");

                    b.Property<string>("Admin3Code");

                    b.Property<string>("Admin4Code");

                    b.Property<string>("Alternatenames");

                    b.Property<string>("Asciiname");

                    b.Property<string>("Cc2");

                    b.Property<string>("CountryCode");

                    b.Property<int?>("Dem");

                    b.Property<int?>("Elevation");

                    b.Property<string>("FeatureClass");

                    b.Property<string>("FeatureCode");

                    b.Property<double?>("Latitude");

                    b.Property<double?>("Longitude");

                    b.Property<DateTime?>("ModificationDate");

                    b.Property<string>("Name");

                    b.Property<int?>("Population");

                    b.Property<string>("Timezone");

                    b.HasKey("Geonameid");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("Entities.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Entities.Models.Friend", b =>
                {
                    b.HasOne("Entities.Models.Locations", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Entities.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
