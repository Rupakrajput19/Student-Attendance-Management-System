USE [StudentApp]
GO

/****** Object:  Table [dbo].[Events]    Script Date: 15-07-2023 16:23:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Events](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [varchar](255) NULL,
	[EventOwner] [varchar](255) NULL,
	[EventDate] [datetime] NULL,
	[EventDay] [varchar](100) NULL,
	[Description] [varchar](255) NULL,
	[UserId] [int] NULL,
	[IsDeleted] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK__Events__7944C810F4B51311] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF__Events__IsDelete__0371755F]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF__Events__CreatedB__04659998]  DEFAULT ('Ritu Kumar') FOR [CreatedBy]
GO

ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF__Events__CreatedO__0559BDD1]  DEFAULT (getdate()) FOR [CreatedOn]
GO

ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF__Events__Modified__064DE20A]  DEFAULT ('Ritu Kumar') FOR [ModifiedBy]
GO

ALTER TABLE [dbo].[Events] ADD  CONSTRAINT [DF__Events__Modified__07420643]  DEFAULT (getdate()) FOR [ModifiedOn]
GO


