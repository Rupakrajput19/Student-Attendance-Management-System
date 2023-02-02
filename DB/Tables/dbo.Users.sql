USE [StudentApp]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 02-02-2023 23:23:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[UserName] [varchar](100) NULL,
	[Mobile] [varchar](10) NULL,
	[Email] [varchar](100) NULL,
	[Password] [varchar](50) NULL,
	[ConfirmPassword] [varchar](50) NULL,
	[IsAdmin] [bit] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsAdmin]  DEFAULT ((0)) FOR [IsAdmin]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedBy]  DEFAULT ((1)) FOR [CreatedBy]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_ModifiedBy]  DEFAULT ((1)) FOR [ModifiedBy]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_ModifiedOn]  DEFAULT (getdate()) FOR [ModifiedOn]
GO


