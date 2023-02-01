select
    'data source=' + @@servername +
    ';initial catalog=' + db_name() +
    case type_desc
        when 'WINDOWS_LOGIN' 
            then ';trusted_connection=true'
        else
            ';user id=' + suser_name() + ';password=<<Rupak19@#>>'
    end
    as ConnectionString
from sys.server_principals
where name = suser_name()


data source=LAPTOP-A5Q0P5KS\SQLEXPRESS09;initial catalog=StudentApp;trusted_connection=true