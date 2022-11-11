const { editAbsenUser } = require('../controller/users');
const { checkSameDay } = require("../utils/absen_utils")
const absensiModel = require('../models/absensis');
const usersModel = require('../models/users');

const absenChekIn = async (nip, absensis) => {
    const checkUser = await usersModel.findOne({where: {nip: nip}});

    const latestAbsen = absensis.filter((absensis) =>  { 
        return (absensis.nip == nip && absensis.status == 'in') 
    } )

    console.log(nip, latestAbsen)

    if( latestAbsen.length == 0 || (checkUser.status == "out" && checkSameDay(latestAbsen[latestAbsen.length -1].createdAt))){
        await editAbsenUser(checkUser, "in");
        const absensiIn = await absensiModel.create({
            nip : nip,
            status : 'in'
        })
        return { responseStatus: 200, absensi: absensiIn, metadata: "absensi in success" };
    } else
        return { responseStatus: 400, absensi: null, metadata: "absensi in failed, user already in" };
}

const absenCheckOut = async (nip) => {
    const checkUser = await usersModel.findOne({where: {nip: nip}});
    if(checkUser.status == "in"){
        await editAbsenUser(checkUser, "out");
        const absensiIn = await absensiModel.create({
            nip : nip,
            status : 'out'
        })
        return { responseStatus: 200, absensi: absensiIn, metadata: "absensi out success" };
    } else 
        return { responseStatus: 400, absensi: null, metadata: "absensi in failed, user already out" };
}

module.exports = {
    absenChekIn,
    absenCheckOut
}