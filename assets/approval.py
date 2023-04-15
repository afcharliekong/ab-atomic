import sys
sys.path.insert(0, '.')

from pyteal import *
from algobpy.parse import parse_params

def app_approval():
    handle_optin = Reject()
    handle_closeout = Reject()
    handle_updateapp = Reject()
    handle_deleteapp = Reject()

    handle_creation = Seq(
        Approve()
    )
    
    approve = Seq(
        Approve()
    )

    handle_noop = Cond(
        [Txn.application_args[0] == Bytes("approve"), approve]
    )

    program = Seq([
        Cond(
            [Txn.application_id() == Int(0), handle_creation],
            [Txn.on_completion() == OnComplete.OptIn, handle_optin],
            [Txn.on_completion() == OnComplete.CloseOut, handle_closeout],
            [Txn.on_completion() == OnComplete.UpdateApplication, handle_updateapp],
            [Txn.on_completion() == OnComplete.DeleteApplication, handle_deleteapp],
            [Txn.on_completion() == OnComplete.NoOp, handle_noop]
        )]
    )

    return program


if __name__ == "__main__":
    params = {}

    # Overwrite params if sys.argv[1] is passed
    if (len(sys.argv) > 1):
        params = parse_params(sys.argv[1], params)

    print(compileTeal(app_approval(), mode=Mode.Application, version=7))