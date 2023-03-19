USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[CheckUserIsAdmin]    Script Date: 18-03-2023 23:35:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[CheckUserIsAdmin]
	@IsAdmin INT,-- Always return true = 1,
      @UserId INT
AS
BEGIN
      SET NOCOUNT ON;
      IF EXISTS(SELECT IsAdmin FROM Users
                    WHERE IsAdmin = @IsAdmin AND UserID = @UserId AND IsDeleted = 0)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END

