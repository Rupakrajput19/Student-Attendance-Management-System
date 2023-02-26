USE [StudentApp]
GO

/****** Object:  Table [dbo].[Students]    Script Date: 26-02-2023 23:52:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Students](
	[StudentID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Mobile] [varchar](15) NOT NULL,
	[Email] [varchar](100) NULL,
	[Gender] [varchar](50) NULL,
	[DateOfBirth] [varchar](100) NULL,
	[FatherName] [varchar](100) NULL,
	[MotherName] [varchar](100) NULL,
	[ClassName] [varchar](100) NULL,
	[RollNo] [varchar](10) NULL,
	[RegistrationID] [varchar](10) NULL,
	[AddmissionDate] [varchar](100) NULL,
	[Address] [varchar](100) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[Pincode] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedOn] [varchar](100) NULL,
	[Photo] [varchar](500) NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF_Students_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__IsDelet__71D1E811]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Created__72C60C4A]  DEFAULT ('Ritu Kumar') FOR [CreatedBy]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Created__73BA3083]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Updated__74AE54BC]  DEFAULT ('Ritu Kumar') FOR [ModifiedBy]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Updated__75A278F5]  DEFAULT (getdate()) FOR [ModifiedOn]
GO


