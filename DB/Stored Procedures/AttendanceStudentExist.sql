USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[CheckEmailAvailability]    Script Date: 26-02-2023 23:35:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[CheckEmailAvailability]
      @Email VARCHAR(100)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT Email FROM Users
                    WHERE Email = @Email)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
