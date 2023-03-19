USE [StudentApp]
GO
/****** Object:  StoredProcedure [dbo].[CheckUserExist]    Script Date: 18-03-2023 23:34:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER PROCEDURE [dbo].[CheckUserExist]
      @UserName VARCHAR(50),
	  @Email VARCHAR(100),
	  @Mobile VARCHAR(50)
AS
BEGIN
      SET NOCOUNT ON;
      IF EXISTS(SELECT UserName, Email, Mobile FROM Users
                    WHERE (UserName = @UserName OR Email = @Email) AND Mobile = @Mobile)
      BEGIN
            SELECT 'TRUE'
      END
      ELSE
      BEGIN
            SELECT 'FALSE'
      END
END
