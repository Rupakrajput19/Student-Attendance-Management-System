USE [StudentApp]
GO

/****** Object:  Table [dbo].[Attendances]    Script Date: 26-02-2023 23:51:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Attendances](
	[AttendanceID] [int] IDENTITY(1,1) NOT NULL,
	[AttendanceDate] [varchar](100) NULL,
	[StudentID] [int] NULL,
	[StudentName] [varchar](100) NULL,
	[ClassName] [varchar](100) NULL,
	[RollNo] [varchar](100) NULL,
	[IsPresent] [bit] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedOn] [varchar](100) NULL,
 CONSTRAINT [PK_Attendance] PRIMARY KEY CLUSTERED 
(
	[AttendanceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendances_AttendanceDate]  DEFAULT (getdate()) FOR [AttendanceDate]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendance_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendance_CreatedBy]  DEFAULT ('Ritu Kumar') FOR [CreatedBy]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendance_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendance_ModifiedBy]  DEFAULT ('Ritu Kumar') FOR [ModifiedBy]
GO

ALTER TABLE [dbo].[Attendances] ADD  CONSTRAINT [DF_Attendance_ModifiedOn]  DEFAULT (getdate()) FOR [ModifiedOn]
GO


