sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/cp/dpa/invwpo/ReworkUI/model/models",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("com.sap.cp.dpa.invwpo.ReworkUI.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            // get task data
            var startupParameters = this.getComponentData().startupParameters;
            var taskModel = startupParameters.taskModel;
            var taskData = taskModel.getData();
            var taskId = taskData.InstanceID;

            // read process context & bind it to the view's main model
            var contextModel = new JSONModel("/comsapcpdpainvwpoReworkUI/workflowruntime/v1/task-instances/" + taskId + "/context");
            contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
            this.setModel(contextModel, "context");

            //set Universal Model
            this.setModel(new JSONModel(), "universalModel");

            // enable routing
			this.getRouter().initialize();
		}
	});
});