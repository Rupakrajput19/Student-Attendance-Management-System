USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[AttendanceDateExist]    Script Date: 18-03-2023 23:30:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[AttendanceDateExist]
      @StudentId INT,
	  @AttendanceDate VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT StudentID, AttendanceDate FROM Attendances
                    WHERE StudentID = @StudentId AND AttendanceDate = @AttendanceDate AND IsDeleted = 0)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
