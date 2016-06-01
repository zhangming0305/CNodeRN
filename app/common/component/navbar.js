'use strict'

import React,{Component,View,Text,TouchableOpacity,StatusBar,StyleSheet,Platform} from "react-native"
import _ from "lodash"
import {preferredStyles,preferredThemeDefines} from "../../lib/helper"

class NavBar extends Component{
    static defaultProps = {
        leftButton:"返回"
    }
    constructor(props){
        super(props)
        this._renderNavBar = this._renderNavBar.bind(this)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userPrefs && nextProps.userPrefs !== this.props.userPrefs){
            StatusBar.setBarStyle((nextProps.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    componentDidMount(){
        if(global.userPrefs){
            StatusBar.setBarStyle((global.userPrefs["preferredTheme"] === "dark")?"light-content":"default")
        }
    }
    _renderNavBar(){
        const {title,leftButton,rightButton,onLeftButtonClick,onRightButtonClick} = this.props
        const styles = preferredStyles(stylesForAll,global.userPrefs)
        const defines = preferredThemeDefines(global.userPrefs)
        
        let _title = (
            <View style={styles.navigationBarTitle}>
            {_.isString(title)?<Text style={styles.navigationBarButtonText}>{title}</Text>:
                React.isValidElement(title)?title:null}
            </View>
        )
        if(_.isFunction(title)){
            _title = title()
        }
        
        let _leftButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onLeftButtonClick || (()=>{})}>
            {_.isString(leftButton)?<Text style={styles.navigationBarButtonText}>{leftButton}</Text>:
                React.isValidElement(leftButton)?leftButton:null}
            </TouchableOpacity>
        )
        if(_.isFunction(leftButton)){
            _leftButton = leftButton()
        }
        
        let _rightButton = (
            <TouchableOpacity style={[styles.navigationBarButton,{marginLeft:5}]} onPress={onRightButtonClick || (()=>{})}>
            {_.isString(rightButton)?<Text style={styles.navigationBarButtonText}>{rightButton}</Text>:
                React.isValidElement(rightButton)?rightButton:null}
            </TouchableOpacity>
        )
        if(_.isFunction(rightButton)){
            _rightButton = rightButton()
        }
        
        return (
            <View style={styles.navigationBar}>
            {_leftButton}{_title}{_rightButton}
            </View>
        )
    }
    render(){
        const headerStyle = {
            height:64,
            borderBottomWidth:0.5,
            borderBottomColor:"#DDD",
            backgroundColor:"#F8F8F8"
        }
        return (
            <View style={headerStyle}>
            <StatusBar />
            {this._renderNavBar()}
            </View>
        )
    }
}

const stylesForAll = {
    navigationBar:{
        marginTop:Platform.OS === "ios"?20:0,
        flexDirection:"row",
        alignItems:"center",
        flex:1
    },
    navigationBarButton:{
        marginRight:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:50
    },
    navigationBarButtonText:{
        fontSize:16,
        color:"#666"
        // paddingLeft:3 
    },
    navigationBarTitle:{
        // height:20,
        marginVertical:Platform.OS === "ios"?8:6,
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    navigationBarTitleText:{
        fontSize:16
    }
}

export default NavBar