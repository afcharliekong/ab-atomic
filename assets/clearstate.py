from pyteal import *

def app_clearstate():
    return Return(Int(1))

if __name__ == "__main__":
    print(compileTeal(app_clearstate(), mode=Mode.Application, version=7))