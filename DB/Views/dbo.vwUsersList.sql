USE [StudentApp]
GO

/****** Object:  View [dbo].[vwUsersList]    Script Date: 07-05-2023 17:46:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER VIEW [dbo].[vwUsersList]
AS
SELECT   UserID, Users.Name, Users.UserName, Users.Mobile, Users.Email, Users.Password, IsAdmin, IsStudent, Students.StudentID
FROM       dbo.Users AS Users LEFT OUTER JOIN
           dbo.Students AS Students ON Students.UserName = Users.UserName AND Students.Email = Users.Email
WHERE    (Users.IsDeleted = 0)
GO


