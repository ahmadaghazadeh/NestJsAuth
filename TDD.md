# Red-> Green-> Refactor

* createTokenAsync
    1. **UserId** is empty or null throw UserIdNullException
    2. **UserId** is less than zero throw UserIdInvalidException
    3. **UserId** retrieve
    4. **DeviceName** is empty or null throw DeviceNameInvalidException
    5. **DeviceName** and **UserId** are duplicate throw DeviceNameAndUserIdDuplicationException
    6. tokenDeviceNameUserIdDuplicationChecker should be called with specific values
    7. **DeviceName** retrieve
       I. refactor All
    8. **jwt** is empty or null throw JWTNotAllowBeNullException
    9. **jwt** is duplicate throw JWTTokenDuplicateException
    10. jwtTokenDuplicationChecker should be called with specific value
    11. **jwt** retrieve

* See All exception 
   
 

 
