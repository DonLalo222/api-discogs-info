import * as cheerio from "cheerio";
import fetch from "node-fetch";

const getFirstImage = async (url) =>{
    const responseImages = await fetch(url);
    const bodyImages = await responseImages.text();
    const selector = cheerio.load(bodyImages);
    const hrefFirstImage = selector('#view_images > p:nth-child(1) > span > img').attr('src');

    return hrefFirstImage;
}


export const getProfile = async (url) => {
    let members = [];
    try {
        const discogs = await fetch(url);
        const body = await discogs.text();

        const $ = cheerio.load(body);
        // *[@id="page_content"]/div[1]/div[1]/div/div[2]/p/a
        // #page_content > div.lr.group > div.left > div > div.image_gallery.image_gallery_large > p > a
        const href = $('#page_content > div.lr.group > div.left > div > div.image_gallery.image_gallery_large > p > a').attr('href');
        const description = $('#profile').text().replace(/\n/g, '').trim();
        const urlImages = 'https://www.discogs.com' + href;
        
        // MEMBERS
        $('#page_content > div.lr.group > div.left > div > div.artist-profile > div > div:nth-child(6) > div a').each((index, element) =>{
            members.push($(element).text());
        })
        // GET FIRST IMAGE
        const image = await getFirstImage(urlImages);       
        //

        const profile = {
            image: image,
            description: description,
            members: members
        }

        return profile;
    } catch (error) {
        console.log(error);
    }


}