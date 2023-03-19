USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[CheckMobileAvailability]    Script Date: 18-03-2023 23:34:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[CheckMobileAvailability]
      @Mobile VARCHAR(50)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT Mobile FROM Users
                    WHERE Mobile = @Mobile)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
