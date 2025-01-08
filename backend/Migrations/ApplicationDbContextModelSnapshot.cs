﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Models.Vessel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AISCode")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("BareboatCharterAddress")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("BareboatCharterName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("Beam")
                        .HasColumnType("int");

                    b.Property<int>("BuildYear")
                        .HasColumnType("int");

                    b.Property<string>("CallSign")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("CargoCapacity")
                        .HasColumnType("int");

                    b.Property<string>("ClassSociety")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("CrewCapacity")
                        .HasColumnType("int");

                    b.Property<string>("CrewOnboardCount")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("DeadweightTonnage")
                        .HasColumnType("int");

                    b.Property<string>("DocMlcOwnerAddress")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("DocMlcOwnerName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("Draft")
                        .HasColumnType("int");

                    b.Property<string>("ETADestination")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("EmployerAgentAddress")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("EmployerAgentName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("EnginePower")
                        .HasColumnType("int");

                    b.Property<string>("EngineType")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Flag")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("FuelCapacity")
                        .HasColumnType("int");

                    b.Property<int>("GrossTonnage")
                        .HasColumnType("int");

                    b.Property<string>("GroupOwnerName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("HandoverDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("HullMaterial")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("ImoNumber")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("InsuranceExpiryDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("InsurancePolicyNumber")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("LastMaintenanceDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("LastPortVisited")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("LastSurveyDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("LengthOverall")
                        .HasColumnType("int");

                    b.Property<int>("NetTonnage")
                        .HasColumnType("int");

                    b.Property<string>("NextMaintenanceDueDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("NextSurveyDueDate")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("OfficialNumber")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("OperationalManagerName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("OperationalRange")
                        .HasColumnType("int");

                    b.Property<int>("PassengerCapacity")
                        .HasColumnType("int");

                    b.Property<string>("PortOfRegistry")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("RegisteredOwnerAddress")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("RegisteredOwnerName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Shipyard")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<int>("Speed")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("TechnicalManagerName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("VesselId")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("VesselName")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("VesselSubtype")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.Property<string>("VesselType")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)");

                    b.HasKey("Id");

                    b.ToTable("Vessels");
                });

            modelBuilder.Entity("PortOfRegistrys", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClassificationSociety")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("GrossTonnage")
                        .HasColumnType("int");

                    b.Property<string>("HomePort")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("NetTonnage")
                        .HasColumnType("int");

                    b.Property<string>("Operator")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PortOfRegistry")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VesselName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("YearBuilt")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("PortOfRegistrys");
                });

            modelBuilder.Entity("VesselFlag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Flag")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("LastInspectionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("LeavingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("NextInspectionDue")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("OnboardedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VesselName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("VesselFlag");
                });

            modelBuilder.Entity("VesselMasterData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("LastInspectionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("LeavingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("NextInspectionDue")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("OnboardedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VesselType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("VesselMasterDatas");
                });

            modelBuilder.Entity("VesselSubtypes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("LastInspectionDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("LeavingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("NextInspectionDue")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("OnboardedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Remarks")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VesselSubtype")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("VesselType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("VesselSubtypes");
                });
#pragma warning restore 612, 618
        }
    }
}
