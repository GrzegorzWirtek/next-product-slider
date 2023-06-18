# Next.js Image Slider component

![slider-screen](https://github.com/GrzegorzWirtek/next-product-slider/assets/83970189/6de6f43a-681e-40c1-8cb0-effcdc7d4392)

Responsive image slider component for e-commerce products, created by and for **Next.js** applications.

Visit page: **[Next image slider](https://next-image-slider.vercel.app/)**

## General info

To avoid having to import extensive libraries, I created a simple but modern slider to display product images in an e-commerce project. The slider is responsive and allows the user to use any number of images. Change slides using the navigation arrows, or by moving the mouse cursor or finger - for mobile devices. The bottom of the slider displays the number of images highlighting the one currently displayed. The css file is added using css modules and placed directly in the "Slider" folder. In addition, the component uses global variables, specifying dimensions ("global.css" file), and navigation arrow graphics ("public/icons" folder). For proper operation of the slider, I recommend specifying the dimensions in "pixels" or "vw" (viewport width).

## Technologies

Project is created with:

- **Next.js**
- **React.js**
- **Css**

## Setup

### Project launch:

```
$ npm run dev
```

### Folders and files to copy:

- **Slider** folder - copy and paste "Slider" folder from/to path **components/Slider**
- **global.css** file - copy and replace the file, or add code containing css variables to the existing "global.css" file
- **icons** folder - copy and paste "icons" folder from/to path **public/icons**
- Create **image** folder in the **public** path and paste there all the graphics you will use to display in the slider

![next-slider-project-structure](https://github.com/GrzegorzWirtek/next-product-slider/assets/83970189/4ae7cc20-4c30-4e03-a77a-a0deda399502)

### Component usage:

To use the **Slider** component you need to:

- Import Slider component to parent component
- Import to parent component the photos and put them in an array of objects, that must contain two keys: "src" - path, "alt" - description
- Place the Slider component and in the props pass the array of photos

![next-slider-usage](https://github.com/GrzegorzWirtek/next-product-slider/assets/83970189/646c7052-7961-4293-8d54-693bd825932e)

#### Tips and notes:

- The slider provides for the display of square-shaped images. Photos with other dimensions will be adjusted to the dimensions of the square.
- The "global.css" file contains variables that define the dimension of the slider for mobile and desktop devices. I recommend specifying the dimensions in **pixels** or **vw** (viewport width) for proper Slider operation
