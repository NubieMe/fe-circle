// import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react";
// import React from "react";
// import { useReply } from "../hooks/useReply";
// import { FaHeart } from "react-icons/fa6";

// interface reply {
//     id: number;
//     content: string;
//     image: string;
//     created_at: string;
//     author: {
//         id: number;
//         name: string;
//         username: string;
//         picture: string;
//     };
// }

// const ReplyList = (props: reply) => {
//     const { likeReply, unlikeReply } = useReply();

//     return (
//         <Flex direction={"row"} mb={2}>
//             <Box me={4} mt={1}>
//                 <Avatar size={"sm"} src={!props.author.picture ? "/src/assets/default.jpg" : props.author.picture} />
//             </Box>
//             <Flex direction={"column"}>
//                 <Flex direction={"row"} gap={2}>
//                     <Text textTransform={"capitalize"}>{props.author.name}</Text>
//                     <Text color={text.secondary}>@{props.author.username}</Text>
//                     <Text>{getDistanceTime(props.created_at)}</Text>
//                 </Flex>
//                 <Text mb={2} fontSize={14}>
//                     {props.content}
//                 </Text>
//                 {!props.image ? null : (
//                     <Box
//                         w={["8rem", "10rem", "15rem"]}
//                         h={["8rem", "10rem", "15rem"]}
//                         overflow={"hidden"}
//                         borderRadius={"20px"}
//                         mb={3}>
//                         <Image boxSize={"full"} objectFit={"cover"} src={props.image} />
//                     </Box>
//                 )}
//                 <Flex direction={"row"} gap={5}>
//                     <Box mt={1} me={-3}>
//                         <Link
//                             onClick={() =>
//                                 !props.isLiked ? likeReply(props.id, thread!.id) : unlikeReply(props.id, thread!.id)
//                             }>
//                             {!props.isLiked ? <FaHeart /> : <FaHeart color="red" />}
//                         </Link>
//                     </Box>
//                     <Text color={text.primary}>{props.likes}</Text>
//                 </Flex>
//             </Flex>
//         </Flex>
//     );
// };

// export default ReplyList;
