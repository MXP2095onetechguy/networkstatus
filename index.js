// module here
const dsn = require("dns");

// state
const NSS = {
    HostnameError: "HSE",
    DownNetworkError: "DNE",
    GoodNetwork: "GN",
    UnknownStatus: "UKS"
};

// recommended, even better if chained
const NSCI = function(url, cb) {
    dsn.lookup(url,function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(NSS.DownNetworkError);
        }
        else if(err)
        {
            cb(NSS.HostnameError);
        }
        else {
            cb(NSS.GoodNetwork);
        }
    })
};


// not recomended
const DNSCI = function(url, url2, url3, cb) {

    // response object
    var r1, r2, r3;

    // response 1
    NSCI(url, function(sts){
        r1 = sts;
    });

    // response 2
    NSCI(url2, function(sts){
        r2 = sts;
    });

    // response 3
    NSCI(url3, function(sts){
        r3 = sts;
    });

    // send callback
    if(r1 == NSS.GoodNetwork && r2 == NSS.GoodNetwork && r3 == NSS.GoodNetwork)
    {
        cb(NSS.GoodNetwork);
    }
    else if(r1 == NSS.HostnameError && r2 == NSS.HostnameError || r3 == NSS.HostnameError)
    {
        cb(NSS.HostnameError);
    }
    else if(r1 == NSS.DownNetworkError && r2 == NSS.DownNetworkError && r3 == NSS.DownNetworkError)
    {
        cb(NSS.DownNetworkError);
    }
    else{
        cb(NSS.UnknownStatus);
    }
};

exports.NS_STATE = NSS;
exports.NS_CheckInternet = NSCI;
exports.NS_TriCheckInternet = DNSCI;