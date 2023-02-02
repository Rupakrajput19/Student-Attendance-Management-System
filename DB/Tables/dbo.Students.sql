USE [StudentApp]
GO

/****** Object:  Table [dbo].[Students]    Script Date: 02-02-2023 23:20:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Students](
	[StudentID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Mobile] [varchar](10) NULL,
	[Email] [varchar](100) NULL,
	[Gender] [varchar](50) NULL,
	[DateOfBirth] [datetime] NULL,
	[FatherName] [varchar](100) NULL,
	[MotherName] [varchar](100) NULL,
	[ClassName] [varchar](100) NULL,
	[RollNo] [varchar](10) NULL,
	[RegistrationID] [varchar](10) NULL,
	[AddmissionDate] [datetime] NULL,
	[Address] [varchar](100) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[Pincode] [varchar](50) NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[StudentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__IsDelet__71D1E811]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Created__72C60C4A]  DEFAULT (suser_sname()) FOR [CreatedBy]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Created__73BA3083]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Updated__74AE54BC]  DEFAULT (suser_sname()) FOR [ModifiedBy]
GO

ALTER TABLE [dbo].[Students] ADD  CONSTRAINT [DF__Student__Updated__75A278F5]  DEFAULT (getdate()) FOR [ModifiedOn]
GO


