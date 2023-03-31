USE [StudentApp]
GO

/****** Object:  View [dbo].[vwStudentsList]    Script Date: 18-03-2023 23:06:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








ALTER VIEW [dbo].[vwStudentsList]
AS
SELECT   StudentID, Name, Mobile, Email, Gender, CONVERT(date, DateOfBirth, 103) AS DateOfBirth, FatherName, MotherName, ClassName, RegistrationID, CONVERT(date, AddmissionDate, 103) AS AddmissionDate, Address + ', ' + City + ', ' + State + ', ' + Country + ' - ' + Pincode AS FullAddress, Address, City, State, Country, Pincode, IsActive, Photo, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn
FROM       dbo.Students
WHERE    (IsDeleted = 0)
GO


