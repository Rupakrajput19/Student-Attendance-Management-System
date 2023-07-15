USE [StudentApp]
GO

/****** Object:  View [dbo].[vwEventsList]    Script Date: 15-07-2023 16:23:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwEventsList]  
  
AS  
  
SELECT EventId, EventName, EventOwner, EventDate, EventDay, Description, UserId, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn   
FROM   dbo.[Events]   
WHERE  (IsDeleted = 0)  
GO


