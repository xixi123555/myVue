import { RouterLink, useLink } from 'vue-router'

export default {
    name: 'AppLink',

    props: {
        ...RouterLink.props,
        inactiveClass: String
    },

    setup(props) {
        console.log('routerLink:',RouterLink,useLink);
    }
}