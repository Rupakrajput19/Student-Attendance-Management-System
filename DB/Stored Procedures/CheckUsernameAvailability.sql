USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[CheckUsernameAvailability]    Script Date: 26-02-2023 23:35:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[CheckUsernameAvailability]
      @UserName VARCHAR(50)
AS
BEGIN
      SET NOCOUNT ON;
      IF NOT EXISTS(SELECT UserName FROM Users
                    WHERE UserName = @UserName)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
