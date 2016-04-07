//module.exports = function(app) {
//  var User = app.models.ppsUser;
//  var Role = app.models.Role;
//  var RoleMapping = app.models.RoleMapping;
//  //var Team = app.models.Team;
//
//  User.create([
//    {firstName: "root", lastName: "user", username: 'master', email: 'master@test.com', password: '12345'}
//  ], function (err, users) {
//    if (err) throw err;
//
//    console.log('Created users:', users);
//
//    //find the sa roleID
//    Role.find({
//      where: {name: "sa"}
//    }, function (err, role) {
//      if (err) throw err;
//
//      console.log('Found role:', role);
//
//      //make mast a super admin
//      RoleMapping.create({
//        principalType: RoleMapping.USER,
//        principalId: users[0].id,
//        roleId: role[0].id
//      }, function (err, principal) {
//        if (err) throw err;
//
//        console.log('Created principal:', principal);
//        //});
//      });
//    });
//  });
//};
