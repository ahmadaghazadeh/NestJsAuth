# Red-> Green-> Refactor

* createTokenAsync
    1. **UserId** is empty or null throw UserIdNullException
    2. **UserId** is less than zero throw UserIdInvalidException
    3. **UserId** retrieve
    4. **DeviceName** is empty or null throw DeviceNameInvalidException
    5. **DeviceName** and **UserId** are duplicate throw DeviceNameAndUserIdDuplicationException
    6. **DeviceName** retrieve
       I. refactor All
    7. **jwt** is empty or null throw JWTNotAllowBeNullException
    8. **jwt** is duplicate throw JWTTokenDuplicateException
    9. **jwt** retrieve

* See All exception 
   
 

 
