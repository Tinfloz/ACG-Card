// import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
// import { countryList } from "../helpers/countries";

// const Test = ({ words }) => {
//     const columns = useBreakpointValue({ base: 4, md: 8 }); // Set number of columns based on screen size

//     return (
//         <Flex
//             justify="center"
//             align="center"
//             h="100vh"
//         >
//             <Box
//                 w={["90%", "90%", "90%", "60%"]} // Set maximum width for responsiveness
//                 maxH="70vh" // Set a fixed maximum height for the box
//                 borderWidth="1px"
//                 borderRadius="lg"
//                 overflowY="auto" // Enable vertical scrolling
//                 p={4} // Add padding as needed
//                 display="grid"
//                 gridTemplateColumns={`repeat(${columns}, 1fr)`} // Define the number of columns
//                 gap={2} // Adjust gap between words
//             >
//                 {words.map((word, index) => (
//                     <Box key={index}>{word}</Box>
//                 ))}
//             </Box>
//         </Flex>
//     );
// }

// export default Test;

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { countryList } from "../helpers/countries";

const words = countryList// Replace with your words

function Test() {
    const containerWidth = useBreakpointValue({ base: "100%", md: "80%" }); // Set container width based on screen size
    const containerHeight = "400px"; // Set a fixed height for the container

    const columns = useBreakpointValue({ base: 2, md: 4 }); // Set number of columns based on screen size

    return (
        <Flex
            justify="center"
            align="center"
            h="100vh"
        >
            <Box
                w={containerWidth} // Set fixed width for the container
                h={containerHeight} // Set fixed height for the container
                borderWidth="1px"
                borderRadius="lg"
                overflow="auto" // Enable scrolling if content exceeds the fixed height
                p={4} // Add padding as needed
                display="grid"
                gridTemplateColumns={`repeat(${columns}, 1fr)`} // Define the number of columns
                gap={2} // Adjust gap between words
            >
                {words.map((word, index) => (
                    <Box key={index}>{word}</Box>
                ))}
            </Box>
        </Flex>
    );
}

export default Test;
