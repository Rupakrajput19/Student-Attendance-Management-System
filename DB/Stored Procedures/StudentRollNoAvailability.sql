USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[StudentRollNoAvailability]    Script Date: 18-03-2023 23:36:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[StudentRollNoAvailability]
      @RollNo VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT RollNo FROM Students
                    WHERE RollNo = @RollNo)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
