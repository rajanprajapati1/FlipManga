import {
    Carousel,
    CarouselIndicator,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
  } from "@/components/extension/carousel";
import SlideCard from "./SlideCard";
import { useRouter } from "next/navigation";
import useHomeStore from "@/zustand/HomeStore";

  const CarouselIndicatorExample = () => {
    const {latest} =  useHomeStore();
    const router = useRouter();

    const HandleSliderNavigation = (slide)=>{
      router.push(`/read/${slide?.title?.userPreferred || slide?.title?.english || slide?.title?.native}`)
    }
    return (
      <Carousel
      className="h-auto mx-auto  border-none relative">
        <CarouselNext />
        <CarouselPrevious />
        <div className=" w-full container">
          <CarouselMainContainer   className="h-auto w-full">
            {latest?.data?.length < 1 ? (<>
              {Array.from({length:5})?.map((_, index) => (
              <SliderMainItem key={index} className="bg-gray-200 animate-pulse h-[70vh]">
              </SliderMainItem>
            ))}
            </>) : 
            latest?.data?.map((data, index) => (
              <SliderMainItem key={index} className="">
               <SlideCard data={data} OnNavigate={HandleSliderNavigation}/>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          {latest?.data && <div className="absolute bottom-2  w-full flex items-center justify-center">
          <CarouselThumbsContainer className="gap-x-1 ">
              {latest?.data?.map((_, index) => (
                <CarouselIndicator className="bg-white" key={index} index={index} />
              ))}
            </CarouselThumbsContainer>
          </div>}
        </div>
      </Carousel>
    );
  };
  
  export default CarouselIndicatorExample;
  