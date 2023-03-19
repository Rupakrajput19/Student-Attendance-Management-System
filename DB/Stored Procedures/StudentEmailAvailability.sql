USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[StudentEmailAvailability]    Script Date: 18-03-2023 23:35:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[StudentEmailAvailability]
      @Email VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT Email FROM Students
                    WHERE Email = @Email)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
