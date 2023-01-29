import { defineComponent } from 'vue';
import { searchHeaderProps, SearchHeaderRenderType } from './types';
import { Row, Col, Form, FormItem } from 'ant-design-vue';
import CheckAuth from '@/components/check-auth/check-auth';

export default defineComponent({
  name: 'search-header',
  props: searchHeaderProps,
  setup(props, { slots }) {
    if (props.renderOptions && props.data) {
      const createItem = (item: SearchHeaderRenderType) => {
        return (
          props.data && (
            <Col {...props.gridLayout.col}>
              <FormItem
                label={item.label}
                labelAlign={props.labelAlign}
                labelCol={props.labelCol}
              >
                {item.options && !item.treeData ? (
                  <item.renderLabel
                    v-model={[props.data[item.key], 'value']}
                    options={item.options}
                    {...item.attribute}
                  ></item.renderLabel>
                ) : null}
                {!item.options && item.treeData ? (
                  <item.renderLabel
                    v-model={[props.data[item.key], 'value']}
                    treeData={item.treeData}
                    {...item.attribute}
                  ></item.renderLabel>
                ) : null}
                {!item.options && !item.treeData ? (
                  <item.renderLabel
                    v-model={[
                      props.data[item.key],
                      'value',
                      item.vModelModifiers,
                    ]}
                    {...item.attribute}
                  ></item.renderLabel>
                ) : null}
              </FormItem>
            </Col>
          )
        );
      };

      return () => {
        return (
          <Form style="width: '100%'; overflow: hidden">
            <Row {...props.gridLayout.row}>
              {props.renderOptions?.map((item) => {
                return item.authorities ? (
                  <CheckAuth authorities={item.authorities}>
                    {createItem(item)}
                  </CheckAuth>
                ) : (
                  createItem(item)
                );
              })}
            </Row>
            <Row>
              <Col span={24} style="text-align: right">
                {slots.footer?.()}
              </Col>
            </Row>
          </Form>
        );
      };
    } else {
      throw new Error('renderOptions is required, data is required');
    }
  },
});
