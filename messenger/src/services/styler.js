import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"


export const iconStyler = (input, size, color) =>{

    switch(input){
        case 'Commercial':
            return <FontAwesome5 name={'building'} size={size} color={color}/>
        case 'Residential':
            return <FontAwesome5 name={'house-user'} size={size} color={color}/>
        case 'Industrial':
            return <FontAwesome5 name={'industry'} size={size} color={color}/>
        case 'plumbing':
            return <MaterialIcons name={"plumbing"} size={size} color={color} />
        case 'roofing':
            return <MaterialIcons name={"roofing"} size={size} color={color} />
        case 'electrical':
            return <MaterialIcons name={"electrical-services"} size={size} color={color} />
        case 'structural':
            return <MaterialCommunityIcons name={"wall"} size={size} color={color} />
        case 'admin':
            return <Feather name={"clipboard"} size={size} color={color} />
        case 'revenue':
            return <FontAwesome name={"dollar"} size={size} color={color} />
    }


}

export const colorStyler = (input) => {



}