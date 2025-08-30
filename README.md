# VAZRD

# Temp
## Communication messages
R - project; C - physical controller as arduino;
M - Main controller; S - Slave

iS - is success

#### System
R `0 1` Initialize
C `0 1` iS Initializing confirmation

R `0 2` Ping
C `0 2` Ping response

#### KBUS
##### Ping
R `2 0 MAC` Try ping slave
M `2 0 MAC` Try ping slave
S `2 0 MAC` Reply on ping
C `2 0 MAC` iS Is slave available on line
##### Inter-Communication
P `2 1 MAC LEN` [..MSG] Send message
M `2 1 MAC LEN` [..MSG] Send message
S `2 1 MAC LEN` [..MSG] Return message
C `2 1 MAC LEN` [..MSG] Return message

#### Messages
If message goes to main, it starts with ``3``
##### Pin
`1 PIN isAnalog` Setup pin mode to analog/digital
`2 PIN Value1 Value1.2` AnalogWrite to PIN with 255(Value1=0, Value1.2=255) or 1010(Value1=1, Value1.1=10)
`3 PIN Value1 Value1.2` DigitalWrite to PIN with 255(Value1=0, Value1.2=255) or 1010(Value1=1, Value1.1=10) 