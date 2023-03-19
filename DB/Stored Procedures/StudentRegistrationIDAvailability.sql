USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[StudentRegistrationIDAvailability]    Script Date: 18-03-2023 23:36:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[StudentRegistrationIDAvailability]
      @RegistrationID VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT RegistrationID FROM Students
                    WHERE RegistrationID = @RegistrationID)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
