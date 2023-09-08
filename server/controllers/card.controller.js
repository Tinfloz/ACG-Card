import User from "../models/user.model.js";
import Content from "../models/content.model.js";
import Event from "../models/event.model.js";
import ScannedUser from "../models/scanned.user.model.js";

const getContentByTagAndLocation = async (req, res) => {
    try {
        const { associate } = req.params;
        const requestedAssociate = await User.findOne({ searchKey: associate });
        if (!requestedAssociate) {
            throw "associate not found"
        };
        const { country, IPv4, lat, lng, fingerprint } = req.body;
        if (!associate || !country || !IPv4 || !lat || !lng || !fingerprint) {
            throw new Error("Required information is missing.");
        };
        let scannedUser = await ScannedUser.findOne({ fingerprint });
        if (!scannedUser) {
            const associates = [requestedAssociate._id];
            const location = {
                type: "Point",
                coordinates: [lng, lat]
            };
            scannedUser = await ScannedUser.create({
                ...req.body, associates, location
            });
        } else {
            scannedUser.associates.push(requestedAssociate._id);
            await scannedUser.save();
        };
        const allContent = await Content.find();
        const allEvent = await Event.find();
        const tagsOfPremierInterest = requestedAssociate.subscribedTags.filter(el => el.country === country)[0].tags;
        const mostImpContent = allContent.find(doc => doc.tag.toString() === tagsOfPremierInterest[0].toString());
        const secondMostImpContent = allContent?.filter(el => tagsOfPremierInterest?.includes(el?.tag))?.filter(el => el?._id !== mostImpContent._id);
        const finalImpContent = [mostImpContent, ...secondMostImpContent];
        const otherTags = requestedAssociate.subscribedTags.filter(el => el.country !== country).reduce((a, b) => {
            return a.concat(b.tags)
        }, []);
        const otherContent = allContent.filter(ele => otherTags.some(el => el.toString() === ele.tag.toString()));
        const finalContentArray = [...finalImpContent, ...otherContent];
        const allTags = [...tagsOfPremierInterest, ...otherTags];
        const finalEventArray = allEvent.filter(el => allTags.some(ele => ele.toString() === el.tag.toString()));
        res.status(200).json({
            success: true,
            content: {
                finalContentArray,
                finalEventArray,
                associate: {
                    name: requestedAssociate.userName,
                    bio: requestedAssociate.bio,
                    email: requestedAssociate.email,
                    image: requestedAssociate.userPhotoStr,
                    linkedIn: requestedAssociate.linkedIn,
                    code: requestedAssociate.code,
                    phone: requestedAssociate.phone
                }
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