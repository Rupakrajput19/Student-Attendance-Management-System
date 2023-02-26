USE [StudentApp]
GO

/****** Object:  View [dbo].[vwStudentsList]    Script Date: 26-02-2023 23:48:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





ALTER VIEW [dbo].[vwStudentsList]
AS
SELECT   StudentID, Name, Mobile, Email,Gender, DateOfBirth, FatherName, MotherName, ClassName, RollNo, RegistrationID, AddmissionDate, Address + ', ' + City + ', ' + State + ', ' + Country + ' - ' + Pincode AS FullAddress, IsActive, Photo
FROM       dbo.Students
WHERE    (IsDeleted = 0)
GO


