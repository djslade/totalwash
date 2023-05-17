import mongoose from "mongoose"
import { Product, Category, Subcategory } from "./models"
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI || '')

const categories = [
    {
        name: 'Furniture',
        description: 'Good bathroom storage is essential to the style and functionality of any bathroom. At TotalWash, we understand how finding the perfect bathroom furniture is key to enhancing the look of your bathroom and making the most of your space. We offer a diverse collection of modern and traditional bathroom furniture - and a range of practical bathroom storage solutions - to help create a bathroom that suits your needs and fits your style.'
    },
    {
        name: 'Accessories',
        description: "Whether you’re after a toilet seat, toilet roll holder or a classy robe hook to complement your room, we have a selection of high-quality accessories to help add the finishing touches to your bathroom. Our matching bathroom accessories come in both modern and traditional styles to suit any décor, and feature a range of finishes to help you complete the look of your bathroom space.",
    },
    {
        name: 'Basins',
        description: "Bathroom basins are available in a huge variety of styles and sizes to suit every bathroom design scheme. Whether you want to create a contemporary look or would prefer something more traditional, you can be sure to discover exactly what you're looking for. As well as modern and traditional styles, you can also choose between basins with full or semi pedestals, countertop basins and cloakroom basins. Each basin has been made from quality ceramic, with finishes"
    },
    {
        name: 'Baths',
        description: "At TotalWash we understand that being able to include a striking designer bath in your bathroom suite is something of a luxury. Thankfully, we have a large range of designer-inspired baths in a variety of sizes and styles, at prices to suit a range of budgets, tastes and bathroom sizes."
    },
    {
        name: 'Showers',
        description: "At TotalWash we are passionate about showers and understand that your shower is often the defining feature of your bathroom space. Whether it’s a part of a refreshing morning routine or simply to relax, your shower is a key component in creating a bathroom you love to look at and enjoy spending time in."
    },
    {
        name: 'Toilets',
        description: "In the TotalWash toilets category you'll find the perfect solution for your bathroom, cloakroom or en-suite toilet needs. From the sleek and contemporary to the elegant and traditional, our selection of toilets is designed to provide you with the utmost comfort and convenience, while also ensuring you of exceptional performance, quality and durability."
    },
]

const subcategories = [
    {
        name: "Bathroom Accessories",
        description: "We offer a full collection of bathroom accessories, including toilet roll holders, glass bathroom shelves, bathroom towel holders and much more. Discover accessories in modern and traditional styles to enhance any bathroom, all featuring premium quality finishes that are built to last.",
        categories: [
            '646513dd16a35b39083ace01',
        ],
    },
    {
        name: "Shower Accessories",
        description: "From shower seats to flexible hoses and shower arms, we have all the shower accessories you need to suit your showering requirements. Our shower hoses are ideal for replacing an old hose, while our shower seats ensure a comfortable showering experience for those who are less mobile. All our shower accessories feature a quality construction and are made to stand the test of time.",
        categories: [
            '646513dd16a35b39083ace01'
        ],
    },
    {
        name: "Toilet Accessories",
        description: "Whether you need waste pipes or a floor fixing kit for your new close coupled toilet or handles and connectors to finish the job, in style, we have all the accessories you need to complete your toilet installation.",
        categories: [
            '646513dd16a35b39083ace01'
        ],
    },
    {
        name: "Counter Top Basins",
        description: "Bring a chic, designer touch to your bathroom with our stunning range of countertop basins. Available in a wide choice of sizes and shapes to suit any requirement, countertop basins have been designed to be fitted to a worktop or a vanity unit. All our countertop basins feature a quality ceramic construction and are available in a range of colours to suit your space too. We have bathroom countertop basins that can be used with wall mounted taps and high-rise taps,",
        categories: [
            '646513dd16a35b39083ace02'
        ],
    },
    {
        name: "Pedestal Basins",
        description: "Discover a huge range of bathroom sinks and create a stylish new look. Our bathroom basins come in an array of designs including modern and traditional to complement any home, as well as sizes to suit any bathroom, en-suite or cloakroom. Each bathroom sink is supplied with a pedestal, which conceals unsightly pipework from view. Our traditional basins are perfect for creating a classic and elegant look that will stand the test of time, while our modern basins are great for adding a touch of designer style at a price that won't break the bank. Semi pedestal basins are ideal for small bathrooms, as they maximise floor space and create a cleaner look. Sinks with full pedestals are easier to install and are perfect for family bathrooms.",
        categories: [
            "646513dd16a35b39083ace02"
        ],
    },
    {
        name: "Washstands",
        description: "Bathroom washstands are a practical and stylish addition to both modern and traditional bathrooms. Exuding sophistication, a washstand offers a functional place to store towels and their sleek and stylish design adds a touch of authenticity to the space too.",
        categories: [
            "646513dd16a35b39083ace02"
        ],
    },
    {
        name: "Corner Baths",
        description: "Corner baths aren’t just a stylish option, they’re also ideal for saving space in smaller bathrooms. A great way to achieve an interesting bathroom layout, a corner bath’s luxury design fits perfectly into bathroom corners to create a unique space to relax.",
        categories: [
            "646513dd16a35b39083ace03"
        ],
    },
    {
        name: "Freestanding Baths",
        description: "There’s nothing that says luxury quite like a freestanding bath. Not only do they bring a touch of hotel elegance to your home, they’re also a great investment.",
        categories: [
            "646513dd16a35b39083ace03"
        ],
    },
    {
        name: "Shower Baths",
        description: "Shower baths are a great option if your bathroom lacks the space for a separate bath and shower enclosure. With a shower bath you get the best of both bathing and showering, which means you don’t have to compromise on style or design. Available in a range of sizes and shapes, a shower bath widens out at one end to form a spacious showering area.",
        categories: [
            "646513dd16a35b39083ace03",
            "646513dd16a35b39083ace04"
        ],
    },
    {
        name: "Small Baths",
        description: "Browse our range of luxury small baths, designed for small bathrooms and ensuites. Our sizes start from as short as 1200mm in length and as low as 700mm in width so you’ll have no trouble finding a compact bath perfect for your small bathroom or ensuite.",
        categories: [
            "646513dd16a35b39083ace03"
        ],
    },
    {
        name: "Standard Baths",
        description: "Don’t let the title of this page fool you – there is nothing basic about our standard bath collection. Though keeping things simple and elegant, our standard bath collection features a variety of bath sizes with single and double-ended options available to help you create a relaxing and stylish bathing experience.",
        categories: [
            "646513dd16a35b39083ace03"
        ],
    },
    {
        name: "Mirrors",
        description: "No bathroom is complete without a stylish mirror on the wall that helps to brighten the space and create a feeling of openness. The perfect finishing touch for every bathroom, cloakroom or ensuite, each of our mirrors has been specially selected for their durable qualities and watertight designs – so that way, they never lose their sparkle.",
        categories: [
            "646513dd16a35b39083ace00"
        ],
    },
    {
        name: "Cabinets and Storage",
        description: "Are you tired of a cluttered and disorganised bathroom? With our bathroom cabinet and storage collection you can wave goodbye to the bathroom mess and welcome a stylish bathroom space with a clean and crisp aesthetic.",
        categories: [
            "646513dd16a35b39083ace00"
        ],
    },
    {
        name: "Vanity Units",
        description: "Discover our extensive collection of bathroom vanity units. With stylish and practical solutions designed to provide those little extra storage solutions your bathroom needs, our vanity units feature a range of styles and finishes to suit any style of bathroom, cloakroom or en-suite.",
        categories: [
            "646513dd16a35b39083ace00"
        ],
    },
    {
        name: "Mixer Showers and Sets",
        description: "Make showering the best part of your day with our luxury range of mixer showers. Practical, stylish – they’re the luxury answer to your showering needs. Our shower mixer collection has been designed to offer you complete control over your showering experience.",
        categories: [
            "646513dd16a35b39083ace04"
        ],
    },
    {
        name: "Bidets",
        description: "Bidets are available in a variety of styles and designs including wall-hung and floor-standing versions to suit every type of bathroom. Wall-hung bidets are ideal for creating more floor space as well as a cleaner, more modern look too. Our wall-hung bidets are available in a range of stunning, contemporary designs to enhance the overall look and feel of your bathroom. Floor standing bidets are also available in a range of designs including more classic styles to complement a traditional bathroom.",
        categories: [
            "646513dd16a35b39083ace05"
        ],
    },
    {
        name: "Standard Toilets",
        description: "In the TotalWash toilets category you'll find the perfect solution for your bathroom, cloakroom or en-suite toilet needs. From the sleek and contemporary to the elegant and traditional, our selection of toilets is designed to provide you with the utmost comfort and convenience, while also ensuring you of exceptional performance, quality and durability.",
        categories: [
            "646513dd16a35b39083ace05"
        ],
    },
]

const products = [
    {

    }
]

const addCategory = async () => {
    try {
        categories.forEach(async (category) => {
            const { name, description } = category
            const newCategory = new Category({
                name,
                description,
            })
            const savedCategory = await newCategory.save()
            console.log(savedCategory)
            return savedCategory._id
        })
    } catch (err) {
        console.log(err)
    }
}

const addSubcategory = async () => {
    try {
        subcategories.forEach(async (subcategory) => {
            const { name, description, categories } = subcategory
            const newSubcategory = new Subcategory({
                name,
                description,
                categories,
            })
            const savedSubcategory = await newSubcategory.save()
            console.log(savedSubcategory)
            return savedSubcategory._id
        })
    } catch (err) {
        console.log(err)
    }
}

addSubcategory()