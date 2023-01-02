

let data = {
    title:'PLB',
    content:''
}
function decodeQueryParam(p) {
    return decodeURIComponent(p.replace(/\+/g, ' '));
  }
function initDataGlobal(req){
    const dataAuth = req.dataAuth;
    data.lang =  req.lang;
    data.locales =  req.locales;
    data.username = dataAuth.username;
    data.cutoffdate = dataAuth.cutoffdate;
    data.menu = dataAuth.module;
    data.company = dataAuth.company;
}

exports.viewHome = function(req,res){
    data.content = './pages/home';
    data.title = 'Home';
    initDataGlobal(req);
    res.render('layout',data);
}
exports.viewInbound = function(req,res){
    data.content = './pages/handlingin';
    data.title = 'Inbound';
    initDataGlobal(req);
    res.render('layout',data);
}
exports.viewOutbound = function(req,res){
    data.content = './pages/handlingout';
    data.title = 'Outbound';
    initDataGlobal(req);
    res.render('layout',data);
}
exports.viewInventory = function(req,res){
    data.content = './pages/inventory';
    data.title = 'Inventory';
    initDataGlobal(req);
    res.render('layout',data);
}
