USE [Garage]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 7/18/2021 6:31:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[LocationId] [int] IDENTITY(1,1) NOT NULL,
	[LocationCode] [nvarchar](50) NOT NULL,
	[LicensePlate] [nvarchar](50) NULL,
	[VehicleTypeId] [int] NULL,
	[X] [int] NOT NULL,
	[Y] [int] NOT NULL,
	[Level] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[LocationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleTypes]    Script Date: 7/18/2021 6:31:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleTypes](
	[VehicleTypeId] [int] IDENTITY(1,1) NOT NULL,
	[VehicleTypeName] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_VehicleTypes] PRIMARY KEY CLUSTERED 
(
	[VehicleTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[VehicleTypes] ON 
GO
INSERT [dbo].[VehicleTypes] ([VehicleTypeId], [VehicleTypeName]) VALUES (1, N'Cars')
GO
INSERT [dbo].[VehicleTypes] ([VehicleTypeId], [VehicleTypeName]) VALUES (2, N'Motorbikes')
GO
SET IDENTITY_INSERT [dbo].[VehicleTypes] OFF
GO
ALTER TABLE [dbo].[Location] ADD  CONSTRAINT [DF_Location_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
