import User from "../models/user.model.js";
import Content from "../models/content.model.js";
import Tag from "../models/tags.model.js";
import Event from "../models/event.model.js";
import ScannedUser from "../models/scanned.user.model.js";

// const getContentByTagAndLocation = async (req, res) => {
//     try {
//         const { associate } = req.params;
//         const { country, IPv4, lat, lng, fingerprint } = req.body;
//         if (!associate || !country || !IPv4 || !lat || !lng || !fingerprint) {
//             throw "info missing";
//         };
//         const acgAssociate = await User.findOne({ userName: associate }).populate("subscribedTags");
//         if (!req.exists) {
//             const associates = [associate];
//             const location = {
//                 type: "Point",
//                 coordinates: [lng, lat]
//             };
//             const newScannedUser = await ScannedUser.create({
//                 ...req.body, associates, location
//             });
//             console.log(newScannedUser);
//         } else {
//             const scannedUser = await ScannedUser.findOne({ fingerprint });
//             scannedUser.associates.push(acgAssociate._id);
//             await scannedUser.save();
//         };
// const tagsOfInterest = acgAssociate.subscribedTags.map(el => {
//     if (el.location === country) {
//         return el._id.toString()
//     }
// });
// const sendContent = (await Content.find()).filter(el => {
//     if (tagsOfInterest.includes(el.tag.toString())) {
//         return el
//     };
// });
// const otherTags = acgAssociate.subscribedTags.map(el => {
//     if (el.location !== country) {
//         return el._id.toString()
//     };
// });
//         const sendOtherContent = (await Content.find()).filter(el => {
//             if (otherTags.includes(el.tag.toString())) {
//                 return el
//             };
//         });
//         const finalContentArray = [...sendContent, ...sendOtherContent];
//         res.status(200).json({
//             success: true,
//             finalContentArray
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.errors?.[0]?.message || error
//         });
//     };
// };

const getContentByTagAndLocation = async (req, res) => {
    try {
        const { associate } = req.params;
        const { country, IPv4, lat, lng, fingerprint } = req.body;
        if (!associate || !country || !IPv4 || !lat || !lng || !fingerprint) {
            throw new Error("Required information is missing.");
        };
        const acgAssociate = await User.findOne({ userName: associate }).populate("subscribedTags");
        if (!acgAssociate) {
            throw "no associate found"
        };
        let scannedUser = await ScannedUser.findOne({ fingerprint });
        if (!scannedUser) {
            const associates = [acgAssociate._id];
            const location = {
                type: "Point",
                coordinates: [lng, lat]
            };
            scannedUser = await ScannedUser.create({
                ...req.body, associates, location
            });
        } else {
            scannedUser.associates.push(acgAssociate._id);
            await scannedUser.save();
        };
        const tagsOfInterest = acgAssociate.subscribedTags
            .filter(tag => tag.location === country)
            .map(tag => tag._id.toString());
        const allContent = await Content.find();
        const allEvent = await Event.find();
        const sendContent = allContent.filter(content => tagsOfInterest.includes(content.tag.toString()));
        const sendEvent = allEvent.filter(event => tagsOfInterest.includes(event.tag.toString()));
        const otherTags = acgAssociate.subscribedTags
            .filter(tag => tag.location !== country)
            .map(tag => tag._id.toString());
        const sendOtherContent = allContent.filter(content => otherTags.includes(content.tag.toString()));
        const sendOtherEvent = allEvent.filter(event => otherTags.includes(event.tag.toString()));
        const finalContentArray = [...sendContent, ...sendOtherContent];
        const finalEventArray = [...sendEvent, ...sendOtherEvent];
        res.status(200).json({
            success: true,
            content: {
                finalContentArray,
                finalEventArray
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message || error
        });
    };
};


export {
    getContentByTagAndLocation
}