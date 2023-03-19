USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[StudentMobileAvailability]    Script Date: 18-03-2023 23:35:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[StudentMobileAvailability]
      @Mobile VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT Mobile FROM Students
                    WHERE Mobile = @Mobile)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
