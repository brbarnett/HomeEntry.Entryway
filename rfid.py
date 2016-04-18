import binascii
import sys
import serial
import Adafruit_PN532 as PN532
import time
import threading

# Setup how the PN532 is connected to the Raspbery Pi/BeagleBone Black.
# It is recommended to use a software SPI connection with 4 digital GPIO pins.

# Configuration for a Raspberry Pi:
CS   = 18
MOSI = 23
MISO = 24
SCLK = 25

# Create an instance of the PN532 class.
pn532 = PN532.PN532(cs=CS, sclk=SCLK, mosi=MOSI, miso=MISO)

# Call begin to initialize communication with the PN532.  Must be done before
# any other calls to the PN532!
pn532.begin()

# Get the firmware version from the chip and print it out.
#ic, ver, rev, support = pn532.get_firmware_version()
#print 'Found PN532 with firmware version: {0}.{1}'.format(ver, rev)

# Configure PN532 to communicate with MiFare cards.
pn532.SAM_configuration()
    
def read_from_rfid():
    # Main loop to detect cards and read a block.
    #print 'Waiting for RFID...'
    while True:
        # Check if a card is available to read.
        uid = pn532.read_passive_target()
        
        if uid is None:
            continue
        binUid = '0x{0}'.format(binascii.hexlify(uid))
        print binUid;
        
        return
       
read_from_rfid()