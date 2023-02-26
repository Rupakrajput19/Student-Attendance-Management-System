USE [StudentApp]
GO

/****** Object:  View [dbo].[vwUsersList]    Script Date: 26-02-2023 23:49:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[vwUsersList]
AS
SELECT   UserID, Name, UserName, Mobile, Email, Password, IsAdmin
FROM       dbo.Users
WHERE    (IsDeleted = 0)
GO


