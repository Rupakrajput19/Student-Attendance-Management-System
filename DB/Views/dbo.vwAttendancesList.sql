USE [StudentApp]
GO

/****** Object:  View [dbo].[vwAttendancesList]    Script Date: 18-03-2023 23:17:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






ALTER VIEW [dbo].[vwAttendancesList]
AS
SELECT AttendanceID, AttendanceDate, Attendances.StudentID, vwStudentsList.Name AS StudentName, vwStudentsList.ClassName, IsPresent, IsDeleted, Attendances.CreatedBy, Attendances.CreatedOn, Attendances.ModifiedBy, Attendances.ModifiedOn  FROM Attendances 
INNER JOIN vwStudentsList ON vwStudentsList.StudentID = Attendances.StudentID
WHERE Attendances.IsDeleted = 0 
GO


